import React, { useEffect, useState } from 'react';
import { useContent } from '../../../lib/ContentContext';
import { Folder, FileText, Plus, Trash2, Edit2, Info, ChevronRight, ChevronDown, LayoutGrid, List, MoreHorizontal, Search, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
interface Project {
  id: string;
  title: string;
  description?: string;
  techStack?: string;
  displayImageUrl?: string;
  projectLinkUrl?: string;
  image?: string;
}
interface FolderType {
  id: string;
  name: string;
  gradient: string;
  projects: Project[];
  expanded?: boolean;
}
type ViewMode = 'large-icons' | 'small-icons' | 'list' | 'details';
export function ProjectsManager() {
  const {
    content,
    updateContent
  } = useContent();
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showPropertiesDialog, setShowPropertiesDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    displayImageUrl: '',
    projectLinkUrl: ''
  });
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: 'folder' | 'project';
    item: any;
  } | null>(null);
  // Initialize folders from content
  useEffect(() => {
    if (content.projects) {
      const foldersData = content.projects.map((folder: any) => ({
        id: folder.id || folder.title.toLowerCase().replace(/\s+/g, '-'),
        name: folder.title,
        gradient: folder.gradient,
        projects: (folder.projects || []).map((p: any) => ({
          ...p,
          id: p.id || Date.now().toString() + Math.random()
        })),
        expanded: true
      }));
      setFolders(foldersData);
    }
  }, [content.projects]);
  const saveToContent = (updatedFolders: FolderType[]) => {
    updateContent({
      projects: updatedFolders.map(f => ({
        title: f.name,
        gradient: f.gradient,
        projects: f.projects
      }))
    });
  };
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: FolderType = {
      id: Date.now().toString(),
      name: newFolderName,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      projects: [],
      expanded: true
    };
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    setNewFolderName('');
    setShowNewFolderDialog(false);
  };
  const handleCreateProject = () => {
    if (!selectedFolderId || !newProjectForm.title.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      ...newProjectForm
    };
    const updatedFolders = folders.map(folder => folder.id === selectedFolderId ? {
      ...folder,
      projects: [...folder.projects, newProject]
    } : folder);
    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    setNewProjectForm({
      title: '',
      description: '',
      techStack: '',
      displayImageUrl: '',
      projectLinkUrl: ''
    });
    setShowNewProjectDialog(false);
  };
  const handleDeleteFolder = (folderId: string) => {
    if (!window.confirm('Are you sure you want to delete this folder and all its contents?')) return;
    const updatedFolders = folders.filter(f => f.id !== folderId);
    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
  };
  const handleDeleteProject = (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const updatedFolders = folders.map(folder => ({
      ...folder,
      projects: folder.projects.filter(p => p.id !== projectId)
    }));
    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    setSelectedProjectId(null);
  };
  const handleRenameFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;
    const newName = window.prompt('Enter new folder name:', folder.name);
    if (!newName || newName === folder.name) return;
    const updatedFolders = folders.map(f => f.id === folderId ? {
      ...f,
      name: newName
    } : f);
    setFolders(updatedFolders);
    saveToContent(updatedFolders);
  };
  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(f => f.id === folderId ? {
      ...f,
      expanded: !f.expanded
    } : f));
  };
  const selectedFolder = folders.find(f => f.id === selectedFolderId);
  const displayProjects = selectedFolder?.projects || [];
  const selectedProject = displayProjects.find(p => p.id === selectedProjectId);
  return <div className="h-full flex flex-col font-['Segoe_UI',sans-serif] text-sm bg-white">
      {/* Explorer Toolbar */}
      <div className="h-9 bg-[#f0f6fb] border-b border-[#d9d9d9] flex items-center px-2 gap-2">
        <div className="flex items-center gap-1 mr-2">
          <button className="p-1 rounded-full hover:bg-white hover:shadow-sm text-gray-400">
            <ArrowLeft size={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-white hover:shadow-sm text-gray-400">
            <ArrowRight size={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-white hover:shadow-sm text-gray-600">
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="flex-1 h-6 bg-white border border-[#d9d9d9] rounded flex items-center px-2 gap-2 shadow-inner">
          <Folder size={14} className="text-yellow-500" />
          <div className="flex items-center text-gray-700 text-xs w-full">
            <span className="hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] px-1 cursor-pointer">
              Computer
            </span>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] px-1 cursor-pointer">
              Projects
            </span>
            {selectedFolder && <>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="font-medium hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] px-1 cursor-pointer">
                  {selectedFolder.name}
                </span>
              </>}
          </div>
        </div>

        <div className="w-48 h-6 bg-white border border-[#d9d9d9] rounded flex items-center px-2 shadow-inner">
          <Search size={14} className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search Projects" className="w-full text-xs outline-none placeholder-gray-400 italic" />
        </div>
      </div>

      {/* Command Bar */}
      <div className="h-8 bg-[#fcfcfe] border-b border-[#e5e5e5] flex items-center px-2 gap-1 text-gray-600">
        <button onClick={() => setShowNewFolderDialog(true)} className="px-3 py-1 hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all">
          <Folder size={14} className="text-yellow-500" />
          New folder
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <button onClick={() => selectedFolderId && setShowNewProjectDialog(true)} disabled={!selectedFolderId} className={`px-3 py-1 hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all ${!selectedFolderId ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Plus size={14} className="text-blue-500" />
          New project
        </button>

        <button onClick={() => {
        if (selectedProjectId) handleDeleteProject(selectedProjectId);else if (selectedFolderId) handleDeleteFolder(selectedFolderId);
      }} disabled={!selectedFolderId && !selectedProjectId} className={`px-3 py-1 hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all ${!selectedFolderId && !selectedProjectId ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Trash2 size={14} className="text-red-500" />
          Delete
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <button onClick={() => setViewMode('details')} className={`p-1 rounded-sm hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] border border-transparent ${viewMode === 'details' ? 'bg-[#cce8ff] border-[#99d1ff]' : ''}`}>
            <List size={14} />
          </button>
          <button onClick={() => setViewMode('large-icons')} className={`p-1 rounded-sm hover:bg-[#e5f3fb] hover:border hover:border-[#7da2ce] border border-transparent ${viewMode === 'large-icons' ? 'bg-[#cce8ff] border-[#99d1ff]' : ''}`}>
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Pane */}
        <div className="w-48 bg-[#fcfcfe] border-r border-[#e5e5e5] overflow-y-auto p-2">
          <div className="text-xs text-gray-700 font-medium mb-2 px-2 uppercase tracking-wider">
            Favorites
          </div>
          <div className="mb-4 space-y-1">
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#e5f3fb] rounded-sm cursor-pointer text-gray-900">
              <LayoutGrid size={14} className="text-blue-500" />
              <span>Desktop</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#e5f3fb] rounded-sm cursor-pointer text-gray-900">
              <ArrowDownCircle size={14} className="text-blue-500" />
              <span>Downloads</span>
            </div>
          </div>

          <div className="text-xs text-gray-700 font-medium mb-2 px-2 uppercase tracking-wider">
            Libraries
          </div>
          <div className="space-y-0.5">
            {folders.map(folder => <div key={folder.id}>
                <div onClick={() => {
              toggleFolder(folder.id);
              setSelectedFolderId(folder.id);
              setSelectedProjectId(null);
            }} onContextMenu={e => {
              e.preventDefault();
              setContextMenu({
                x: e.clientX,
                y: e.clientY,
                type: 'folder',
                item: folder
              });
            }} className={`flex items-center gap-1 px-2 py-1 cursor-pointer text-xs border border-transparent ${selectedFolderId === folder.id ? 'bg-[#cce8ff] border-[#99d1ff] text-gray-900' : 'hover:bg-[#e5f3fb] hover:border-[#e5f3fb] text-gray-900'}`}>
                  <span className="text-gray-600 w-3 flex justify-center">
                    {folder.expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                  </span>
                  <Folder size={14} className="text-yellow-500" />
                  <span className="truncate font-medium">{folder.name}</span>
                </div>

                {folder.expanded && <div className="pl-6 space-y-0.5 mt-0.5">
                    {folder.projects.map(project => <div key={project.id} onClick={() => {
                setSelectedFolderId(folder.id);
                setSelectedProjectId(project.id);
              }} onContextMenu={e => {
                e.preventDefault();
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  type: 'project',
                  item: project
                });
              }} className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-xs border border-transparent rounded-sm ${selectedProjectId === project.id ? 'bg-[#cce8ff] border-[#99d1ff] text-gray-900' : 'hover:bg-[#e5f3fb] hover:border-[#e5f3fb] text-gray-900'}`}>
                        <FileText size={12} className="text-gray-600" />
                        <span className="truncate">{project.title}</span>
                      </div>)}
                  </div>}
              </div>)}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-y-auto p-2">
          {!selectedFolderId ? <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <Folder size={48} className="mb-2 opacity-30" />
              <span className="font-medium">
                Select a folder to view contents
              </span>
            </div> : <>
              {viewMode === 'details' && <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-200">
                      <th className="pb-2 pl-2 font-medium w-1/3 hover:bg-[#e5f3fb] cursor-pointer">
                        Name
                      </th>
                      <th className="pb-2 font-medium w-1/3 hover:bg-[#e5f3fb] cursor-pointer">
                        Tech Stack
                      </th>
                      <th className="pb-2 font-medium w-1/6 hover:bg-[#e5f3fb] cursor-pointer">
                        Type
                      </th>
                      <th className="pb-2 font-medium w-1/6 hover:bg-[#e5f3fb] cursor-pointer">
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProjects.map(project => <tr key={project.id} onClick={() => setSelectedProjectId(project.id)} onDoubleClick={() => setShowPropertiesDialog(true)} onContextMenu={e => {
                e.preventDefault();
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  type: 'project',
                  item: project
                });
              }} className={`border border-transparent cursor-default ${selectedProjectId === project.id ? 'bg-[#cce8ff] border-[#99d1ff]' : 'hover:bg-[#e5f3fb] hover:border-[#e5f3fb]'}`}>
                        <td className="py-1 pl-2 flex items-center gap-2 text-gray-900 font-medium">
                          <FileText size={14} className="text-gray-600" />
                          {project.title}
                        </td>
                        <td className="py-1 text-gray-700">
                          {project.techStack || 'N/A'}
                        </td>
                        <td className="py-1 text-gray-700">Project File</td>
                        <td className="py-1 text-gray-700">1 KB</td>
                      </tr>)}
                  </tbody>
                </table>}

              {viewMode === 'large-icons' && <div className="flex flex-wrap gap-4 p-2">
                  {displayProjects.map(project => <div key={project.id} onClick={() => setSelectedProjectId(project.id)} onDoubleClick={() => setShowPropertiesDialog(true)} onContextMenu={e => {
              e.preventDefault();
              setContextMenu({
                x: e.clientX,
                y: e.clientY,
                type: 'project',
                item: project
              });
            }} className={`w-24 flex flex-col items-center gap-1 p-2 border border-transparent rounded hover:bg-[#e5f3fb] hover:border-[#e5f3fb] cursor-default ${selectedProjectId === project.id ? 'bg-[#cce8ff] border-[#99d1ff]' : ''}`}>
                      <FileText size={48} className="text-gray-500 drop-shadow-sm" />
                      <span className="text-xs text-center leading-tight line-clamp-2 w-full break-words text-gray-900 font-medium">
                        {project.title}
                      </span>
                    </div>)}
                </div>}
            </>}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#f0f6fb] border-t border-[#d9d9d9] flex items-center px-4 gap-4 text-xs text-gray-700">
        <span>{displayProjects.length} items</span>
        {selectedProjectId && <span>1 item selected</span>}
      </div>

      {/* Dialogs */}
      {showNewFolderDialog && <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden">
            <div className="bg-[#f0f6fb] px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">New Folder</span>
              <X size={16} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setShowNewFolderDialog(false)} />
            </div>
            <div className="p-4">
              <label className="block text-xs text-gray-700 font-medium mb-2">
                Folder Name:
              </label>
              <input type="text" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} autoFocus className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none" />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={handleCreateFolder} className="px-4 py-1 bg-[#f0f6fb] border border-gray-300 rounded hover:bg-white hover:border-blue-400 transition-colors text-gray-900 font-medium">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* Add Project Dialog */}
      {showNewProjectDialog && <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="w-96 bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden">
            <div className="bg-[#f0f6fb] px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">New Project</span>
              <X size={16} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setShowNewProjectDialog(false)} />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Title
                </label>
                <input type="text" value={newProjectForm.title} onChange={e => setNewProjectForm({
              ...newProjectForm,
              title: e.target.value
            })} className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:border-blue-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea value={newProjectForm.description} onChange={e => setNewProjectForm({
              ...newProjectForm,
              description: e.target.value
            })} rows={3} className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:border-blue-400 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Tech Stack
                </label>
                <input type="text" value={newProjectForm.techStack} onChange={e => setNewProjectForm({
              ...newProjectForm,
              techStack: e.target.value
            })} className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:border-blue-400 outline-none" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={handleCreateProject} className="px-4 py-1 bg-[#f0f6fb] border border-gray-300 rounded hover:bg-white hover:border-blue-400 transition-colors text-gray-900 font-medium">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}
function ArrowDownCircle({
  size,
  className
}: {
  size: number;
  className?: string;
}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 12 16 16 12" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>;
}
function X({
  size,
  className,
  onClick
}: {
  size: number;
  className?: string;
  onClick?: () => void;
}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} onClick={onClick}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>;
}