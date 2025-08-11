

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SearchFilter from '../../components/SearchFilter';
import TaskCard from '../../constants/TaskCard';
import Modal from '../../constants/Modal';
import Dropdown from '../../constants/Dropdown';
import InviteUsersModal from '../../components/InviteUsersModal';
import { todoService } from '../../services/todoService';
import { append, setFilters, setLoading } from '../../redux/slices/taskSlice';
import type { RootState } from '../../redux/store';
import type { Todo, TodoPriority, TodoStatus } from '../../types';
import { toast } from 'react-toastify';

const PAGE_SIZE = 10;
const statusOptions = ['Todo', 'In Progress', 'On Hold', 'Done', 'Will Not Do'].map(s => ({ label: s, value: s }));
const priorityOptions = ['Low', 'Medium', 'High', 'Critical'].map(s => ({ label: s, value: s }));

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const { items, page, totalPages, loading, filters } = useSelector((s: RootState) => s.tasks);

  const [selected, setSelected] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openInvite, setOpenInvite] = useState(false);

  const loadPage = async (pageNumber: number) => {
    dispatch(setLoading(true));
    try {
      const params: any = { page: pageNumber, limit: PAGE_SIZE, ...filters };
      if (!params.status) delete params.status;
      if (!params.priority) delete params.priority;
      if (!params.title) delete params.title;

      const res = await todoService.list(params);
      dispatch(append({ todos: res.todos || [], page: res.page, totalPages: res.totalPages }));
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadPage(1);
  }, [filters]);

  useEffect(() => {
    const onScroll = () => {
      if (loading) return;
      if (page >= totalPages) return;

      const scrollPos = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 200;
      if (scrollPos >= threshold) {
        loadPage(page + 1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page, totalPages, loading]); // simple deps

  const onFilter = (f: { status?: string; priority?: string }) => dispatch(setFilters(f));
  const onSearch = (text: string) => dispatch(setFilters({ title: text.trim() || undefined }));

 const onSave = async () => {
    if (!selected) return;
    try {
      const payload: Partial<Todo> = {
        title: selected.title,
        description: selected.description,
        status: selected.status,
        priority: selected.priority,
        expected_completion_at: selected.expected_completion_at,
      };
      if (selected.todo_id) {
        await todoService.patch(selected.todo_id, payload);
      } else {
        await todoService.create(payload);
      }
      setSelected(null);
      loadPage(1);
      toast.success('Todo saved!');
    } catch {
      toast.error('Failed to save task');
    }
  };

  // delete
  const onDelete = async () => {
    if (!deleteId) return;
    try {
      await todoService.remove(deleteId);
      setDeleteId(null);
      loadPage(1);
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const onChangeStatus = async (id: string, value: string) => {
    try {
      await todoService.patch(id, { status: value as TodoStatus });
      toast.success('Status updated');
      loadPage(page);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const onChangePriority = async (id: string, value: string) => {
    try {
      await todoService.patch(id, { priority: value as TodoPriority });
      toast.success('Priority updated');
      loadPage(page);
    } catch {
      toast.error('Failed to update priority');
    }
  };

  return (
    <>
      <Header onOpenInvite={() => setOpenInvite(true)} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            onClick={() =>
              setSelected({
                title: '',
                description: '',
                status: '' as any,
                priority: '' as any,
                expected_completion_at: undefined as any,
              } as Todo)
            }
          >
            + New Task
          </button>
        </div>

        <SearchFilter onSearch={onSearch} onFilter={onFilter} />

        <div className="mt-6 space-y-4">
          {items.map((t) => (
            <TaskCard
              key={t.todo_id}
              id={t.todo_id}
              title={t.title}
              description={t.description}
              status={t.status}
              priority={t.priority}
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              onChangeStatus={onChangeStatus}
              onChangePriority={onChangePriority}
              onEdit={() => setSelected(t)}
              onDelete={() => setDeleteId(t.todo_id)}
              busy={false} 
            />
          ))}

          {loading && <div className="py-3 text-center text-sm text-gray-500">Loading…</div>}
          {!loading && page >= totalPages && (
            <div className="py-3 text-center text-sm text-gray-400">You’re all caught up</div>
          )}
        </div>

        <Modal
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected?.todo_id ? 'Update Task' : 'Add New Task'}
          footer={
            <>
              <button className="rounded-lg border px-4 py-2" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white" onClick={onSave}>
                {selected?.todo_id ? 'Update' : 'Submit'}
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="mb-1 text-sm font-medium">Title</div>
              <input
                value={selected?.title || ''}
                onChange={(e) => setSelected({ ...selected!, title: e.target.value })}
                className="w-full rounded-lg border px-3 py-2"
                placeholder="e.g., Design the new landing page"
              />
            </div>

            <div>
              <div className="mb-1 text-sm font-medium">Description</div>
              <textarea
                value={selected?.description || ''}
                onChange={(e) => setSelected({ ...selected!, description: e.target.value })}
                className="min-h-28 w-full rounded-lg border px-3 py-2"
                placeholder="Provide a detailed description of the task..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Dropdown
                label="Priority"
                value={selected?.priority || ''}
                onChange={(v) => setSelected({ ...selected!, priority: v as TodoPriority })}
                options={priorityOptions}
                placeholder="Select Priority"
              />
              <Dropdown
                label="Status"
                value={selected?.status || ''}
                onChange={(v) => setSelected({ ...selected!, status: v as TodoStatus })}
                options={statusOptions}
                placeholder="Select Status"
              />
            </div>
          </div>
        </Modal>

        {/* Delete */}
        <Modal
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          title="Confirm Deletion"
          footer={
            <>
              <button className="rounded-lg border px-4 py-2" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="rounded-lg bg-red-600 px-4 py-2 text-white" onClick={onDelete}>
                Confirm
              </button>
            </>
          }
        >
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this task? This action is permanent and cannot be undone.
          </p>
        </Modal>
      </div>

      <InviteUsersModal open={openInvite} onClose={() => setOpenInvite(false)} />
    </>
  );
};

export default Tasks;
