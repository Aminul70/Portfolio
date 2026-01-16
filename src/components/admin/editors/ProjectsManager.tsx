import { useEffect, useState } from 'react';
import { useContent } from '../../../lib/ContentContext';
import { Folder, FileText, Plus, Trash2, Edit2, Info, ChevronRight, ChevronDown, LayoutGrid, List, Search, ArrowLeft, ArrowRight, ArrowUp, X, Save, ExternalLink, Image as ImageIcon } from 'lucide-react';

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
  const { content, updateContent } = useContent();
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('details');

  // Dialog States
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showPropertiesDialog, setShowPropertiesDialog] = useState(false);
  const [isRenaming, setIsRenaming] = useState<{ type: 'folder' | 'project', id: string } | null>(null);

  // Form States
  const [newFolderName, setNewFolderName] = useState('');
  const [projectForm, setProjectForm] = useState<Project>({
    id: '',
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
        projects: f.projects.map(p => ({
          ...p,
          image: p.image || ''
        }))
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
    if (!selectedFolderId || !projectForm.title.trim()) return;
    const newProject: Project = { ...projectForm, id: Date.now().toString() };

    const updatedFolders = folders.map(folder =>
      folder.id === selectedFolderId
        ? { ...folder, projects: [...folder.projects, newProject] }
        : folder
    );

    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    resetProjectForm();
    setShowNewProjectDialog(false);
  };

  const handleUpdateProject = () => {
    if (!selectedFolderId || !projectForm.id) return;

    const updatedFolders = folders.map(folder => {
      if (folder.projects.some(p => p.id === projectForm.id)) {
        return {
          ...folder,
          projects: folder.projects.map(p => p.id === projectForm.id ? projectForm : p)
        };
      }
      return folder;
    });

    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    setShowPropertiesDialog(false);
  };

  const handleDelete = () => {
    if (selectedProjectId) {
      if (!window.confirm('Are you sure you want to delete this project?')) return;
      const updatedFolders = folders.map(folder => ({
        ...folder,
        projects: folder.projects.filter(p => p.id !== selectedProjectId)
      }));
      setFolders(updatedFolders);
      saveToContent(updatedFolders);
      setSelectedProjectId(null);
    } else if (selectedFolderId) {
      if (!window.confirm('Are you sure you want to delete this folder and all its contents?')) return;
      const updatedFolders = folders.filter(f => f.id !== selectedFolderId);
      setFolders(updatedFolders);
      saveToContent(updatedFolders);
      setSelectedFolderId(null);
    }
  };

  const handleRename = (id: string, newName: string, type: 'folder' | 'project') => {
    if (!newName.trim()) return;

    let updatedFolders = folders;
    if (type === 'folder') {
      updatedFolders = folders.map(f => f.id === id ? { ...f, name: newName } : f);
    } else {
      updatedFolders = folders.map(f => ({
        ...f,
        projects: f.projects.map(p => p.id === id ? { ...p, title: newName } : p)
      }));
    }

    setFolders(updatedFolders);
    saveToContent(updatedFolders);
    setIsRenaming(null);
  };

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(f =>
      f.id === folderId ? { ...f, expanded: !f.expanded } : f
    ));
  };

  const resetProjectForm = () => {
    setProjectForm({
      id: '',
      title: '',
      description: '',
      techStack: '',
      displayImageUrl: '',
      projectLinkUrl: ''
    });
  };

  const openProperties = (project: Project) => {
    setProjectForm(project);
    setShowPropertiesDialog(true);
  };

  const selectedFolder = folders.find(f => f.id === selectedFolderId);
  const displayProjects = selectedFolder?.projects || [];

  const RenameInput = ({ initialValue, onSave }: { initialValue: string, onSave: (val: string) => void }) => {
    const [value, setValue] = useState(initialValue);
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onSave(value)}
        onKeyDown={(e) => e.key === 'Enter' && onSave(value)}
        autoFocus
        className="w-full h-full px-1 border border-blue-400 outline-none text-xs bg-black/40 text-white rounded-sm"
        onClick={(e) => e.stopPropagation()}
      />
    );
  };

  return (
    <div className="h-full flex flex-col font-['Segoe_UI',sans-serif] text-sm" onClick={() => setContextMenu(null)}>
      {/* Explorer Toolbar */}
      <div className="h-9 bg-white/5 border-b border-white/10 flex items-center px-2 gap-2">
        <div className="flex items-center gap-1 mr-2">
          <button className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ArrowRight size={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="flex-1 h-6 bg-black/20 border border-white/10 rounded flex items-center px-2 gap-2 shadow-inner">
          <Folder size={14} className="text-yellow-500" />
          <div className="flex items-center text-gray-200 text-xs w-full">
            <span className="hover:bg-white/10 px-1 cursor-pointer rounded" onClick={() => setSelectedFolderId(null)}>
              Computer
            </span>
            <ChevronRight size={12} className="text-gray-500" />
            <span className="hover:bg-white/10 px-1 cursor-pointer rounded" onClick={() => setSelectedFolderId(null)}>
              Projects
            </span>
            {selectedFolder && (
              <>
                <ChevronRight size={12} className="text-gray-500" />
                <span className="font-medium hover:bg-white/10 px-1 cursor-pointer rounded">
                  {selectedFolder.name}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="w-48 h-6 bg-black/20 border border-white/10 rounded flex items-center px-2 shadow-inner">
          <Search size={14} className="text-gray-500 mr-2" />
          <input type="text" placeholder="Search Projects" className="w-full text-xs outline-none bg-transparent text-white placeholder-gray-500 italic" />
        </div>
      </div>

      {/* Command Bar */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-2 gap-1 text-gray-300 shadow-sm z-10 transition-colors">
        <button onClick={() => setShowNewFolderDialog(true)} className="px-3 py-1 hover:bg-white/10 border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all">
          <Folder size={14} className="text-yellow-500" />
          New folder
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        <button
          onClick={() => { resetProjectForm(); setShowNewProjectDialog(true); }}
          disabled={!selectedFolderId}
          className={`px-3 py-1 hover:bg-white/10 border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all ${!selectedFolderId ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Plus size={14} className="text-blue-400" />
          New project
        </button>

        <button
          onClick={() => setIsRenaming({ type: selectedProjectId ? 'project' : 'folder', id: selectedProjectId || selectedFolderId! })}
          disabled={!selectedFolderId && !selectedProjectId}
          className={`px-3 py-1 hover:bg-white/10 border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all ${(!selectedFolderId && !selectedProjectId) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Edit2 size={14} className="text-green-400" />
          Rename
        </button>

        <button
          onClick={handleDelete}
          disabled={!selectedFolderId && !selectedProjectId}
          className={`px-3 py-1 hover:bg-white/10 border border-transparent rounded-sm flex items-center gap-2 text-xs transition-all ${(!selectedFolderId && !selectedProjectId) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Trash2 size={14} className="text-red-400" />
          Delete
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <button onClick={() => setViewMode('details')} className={`p-1 rounded-sm hover:bg-white/10 border border-transparent ${viewMode === 'details' ? 'bg-white/10' : ''}`}>
            <List size={14} />
          </button>
          <button onClick={() => setViewMode('large-icons')} className={`p-1 rounded-sm hover:bg-white/10 border border-transparent ${viewMode === 'large-icons' ? 'bg-white/10' : ''}`}>
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Pane */}
        <div className="w-48 bg-white/5 border-r border-white/10 overflow-y-auto p-2 backdrop-blur-sm">
          <div className="text-xs text-gray-400 font-medium mb-2 px-2 uppercase tracking-wider">
            Locations
          </div>
          <div className="space-y-0.5">
            {folders.map(folder => (
              <div key={folder.id}>
                <div
                  onClick={() => { toggleFolder(folder.id); setSelectedFolderId(folder.id); setSelectedProjectId(null); }}
                  onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, type: 'folder', item: folder }); }}
                  className={`flex items-center gap-1 px-2 py-1 cursor-pointer text-xs border border-transparent rounded-sm ${selectedFolderId === folder.id ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                >
                  <span className="text-gray-400 w-3 flex justify-center">
                    {folder.expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                  </span>
                  <Folder size={14} className="text-yellow-500" />
                  {isRenaming?.type === 'folder' && isRenaming.id === folder.id ? (
                    <RenameInput initialValue={folder.name} onSave={(val) => handleRename(folder.id, val, 'folder')} />
                  ) : (
                    <span className="truncate font-medium">{folder.name}</span>
                  )}
                </div>

                {folder.expanded && (
                  <div className="pl-6 space-y-0.5 mt-0.5">
                    {folder.projects.map(project => (
                      <div
                        key={project.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedFolderId(folder.id); setSelectedProjectId(project.id); }}
                        onDoubleClick={() => openProperties(project)}
                        className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-xs border border-transparent rounded-sm ${selectedProjectId === project.id ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
                      >
                        <FileText size={12} className={selectedProjectId === project.id ? "text-blue-300" : "text-gray-500"} />
                        {isRenaming?.type === 'project' && isRenaming.id === project.id ? (
                          <RenameInput initialValue={project.title} onSave={(val) => handleRename(project.id, val, 'project')} />
                        ) : (
                          <span className="truncate">{project.title}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-transparent overflow-y-auto p-2">
          {!selectedFolderId ? (
            <div className="h-full flex flex-col items-center justify-center text-white/30">
              <Folder size={48} className="mb-2 opacity-50" />
              <span className="font-medium">Select a folder to view projects</span>
            </div>
          ) : (
            <>
              {viewMode === 'details' && (
                <table className="w-full text-xs text-white">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-2 pl-2 font-medium w-1/3 hover:bg-white/5 cursor-pointer">Name</th>
                      <th className="pb-2 font-medium w-1/3 hover:bg-white/5 cursor-pointer">Tech Stack</th>
                      <th className="pb-2 font-medium w-1/6 hover:bg-white/5 cursor-pointer">Type</th>
                      <th className="pb-2 font-medium w-1/6 hover:bg-white/5 cursor-pointer">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProjects.map(project => (
                      <tr
                        key={project.id}
                        onClick={() => setSelectedProjectId(project.id)}
                        onDoubleClick={() => openProperties(project)}
                        onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, type: 'project', item: project }); }}
                        className={`border border-transparent cursor-default rounded-sm ${selectedProjectId === project.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                      >
                        <td className="py-1 pl-2 flex items-center gap-2 text-white font-medium">
                          <FileText size={14} className="text-blue-300" />
                          {isRenaming?.type === 'project' && isRenaming.id === project.id ? (
                            <RenameInput initialValue={project.title} onSave={(val) => handleRename(project.id, val, 'project')} />
                          ) : (
                            project.title
                          )}
                        </td>
                        <td className="py-1 text-gray-300">{project.techStack || 'N/A'}</td>
                        <td className="py-1 text-gray-400">Project File</td>
                        <td className="py-1 text-gray-400">1 KB</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {viewMode === 'large-icons' && (
                <div className="flex flex-wrap gap-4 p-2">
                  {displayProjects.map(project => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      onDoubleClick={() => openProperties(project)}
                      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, type: 'project', item: project }); }}
                      className={`w-24 flex flex-col items-center gap-1 p-2 border border-transparent rounded hover:bg-white/10 cursor-default ${selectedProjectId === project.id ? 'bg-white/20 ring-1 ring-white/30' : ''}`}
                    >
                      <FileText size={48} className="text-white/80 drop-shadow-sm" />
                      <span className="text-xs text-center leading-tight line-clamp-2 w-full break-words text-white font-medium shadow-black/50 drop-shadow-md">
                        {project.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-white/5 border-t border-white/10 flex items-center px-4 gap-4 text-xs text-gray-400">
        <span>{displayProjects.length} items</span>
        {selectedProjectId && <span>1 item selected</span>}
      </div>

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
          <div className="w-80 bg-slate-900 rounded-lg shadow-2xl border border-white/20 overflow-hidden box-content ring-1 ring-black/50">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
              <span className="font-medium text-white">New Folder</span>
              <X size={16} className="text-gray-400 cursor-pointer hover:bg-red-500 hover:text-white rounded-sm transition-colors" onClick={() => setShowNewFolderDialog(false)} />
            </div>
            <div className="p-4">
              <label className="block text-xs text-gray-300 font-medium mb-2">Folder Name:</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                className="w-full border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
              />
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/10">
                <button
                  onClick={handleCreateFolder}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-blue-400 transition-all text-white text-xs font-medium shadow-sm active:shadow-inner"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Properties / Edit Dialog */}
      {(showNewProjectDialog || showPropertiesDialog) && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
          <div className="w-[500px] bg-slate-900 rounded-lg shadow-2xl border border-white/20 overflow-hidden ring-1 ring-black/50 text-white">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
              <span className="font-medium text-white">{showNewProjectDialog ? 'New Project' : 'Project Properties'}</span>
              <X size={16} className="text-gray-400 cursor-pointer hover:bg-red-500 hover:text-white rounded-sm transition-colors" onClick={() => { setShowNewProjectDialog(false); setShowPropertiesDialog(false); }} />
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                <label className="text-xs text-gray-400 font-medium text-right">Title:</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                <label className="text-xs text-gray-400 font-medium text-right mt-2">Description:</label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                <label className="text-xs text-gray-400 font-medium text-right">Tech Stack:</label>
                <input
                  type="text"
                  placeholder="e.g. React, TypeScript, Node.js"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  className="w-full border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                <label className="text-xs text-gray-400 font-medium text-right">Image URL:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={projectForm.displayImageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, displayImageUrl: e.target.value })}
                    className="flex-1 border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                  />
                  <button className="p-1.5 border border-white/20 rounded hover:bg-white/10" title="Browse...">
                    <ImageIcon size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                <label className="text-xs text-gray-400 font-medium text-right">Project Link:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={projectForm.projectLinkUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, projectLinkUrl: e.target.value })}
                    className="flex-1 border border-white/20 bg-black/40 rounded px-2 py-1.5 text-sm text-white focus:border-blue-400 outline-none"
                  />
                  <button className="p-1.5 border border-white/20 rounded hover:bg-white/10" title="Test Link">
                    <ExternalLink size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => { setShowNewProjectDialog(false); setShowPropertiesDialog(false); }}
                  className="px-4 py-1.5 border border-white/20 rounded hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={showNewProjectDialog ? handleCreateProject : handleUpdateProject}
                  className="px-6 py-1.5 bg-white/5 border border-blue-500/50 rounded hover:bg-blue-600/20 hover:border-blue-400 transition-all text-white text-xs font-medium shadow-sm active:shadow-inner flex items-center gap-2"
                >
                  <Save size={14} className="" />
                  {showNewProjectDialog ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[2100] w-48 bg-slate-800 border border-white/20 shadow-xl py-1 rounded-sm text-xs text-gray-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div onClick={() => { setIsRenaming({ type: contextMenu.type, id: contextMenu.item.id }); setContextMenu(null); }} className="px-4 py-1.5 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-gray-200">
            <Edit2 size={14} /> Rename
          </div>
          <div className="h-px bg-white/10 my-1" />
          <div onClick={() => {
            if (contextMenu.type === 'project') { setSelectedProjectId(contextMenu.item.id); handleDelete(); }
            if (contextMenu.type === 'folder') { setSelectedFolderId(contextMenu.item.id); handleDelete(); }
            setContextMenu(null);
          }}
            className="px-4 py-1.5 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-red-400"
          >
            <Trash2 size={14} /> Delete
          </div>
          {contextMenu.type === 'project' && (
            <>
              <div className="h-px bg-white/10 my-1" />
              <div onClick={() => { openProperties(contextMenu.item); setContextMenu(null); }} className="px-4 py-1.5 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-gray-200 font-bold">
                <Info size={14} /> Properties
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}