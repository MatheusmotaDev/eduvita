"use client";

import { useEffect, useState } from "react";
import { Denuncia, getDenuncias, updateDenuncia, deleteDenuncia } from "../services/denunciaService";
import { Loader2, Trash2, Edit2, Check, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

export function DenunciasClient() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getDenuncias();
      setDenuncias(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      await updateDenuncia(id, editDesc);
      setEditingId(null);
      loadData();
    } catch (e) {
      alert("Erro ao atualizar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar este alerta?")) return;
    try {
      await deleteDenuncia(id);
      loadData();
    } catch (e) {
      alert("Erro ao apagar.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-white rounded-xl border border-neutral-200">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (denuncias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-neutral-200 text-neutral-500">
        <AlertTriangle className="h-12 w-12 text-neutral-300 mb-4" />
        <p>Nenhum alerta registrado no sistema ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {denuncias.map((d) => (
        <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group">
          
          {/* Header */}
          <div className="p-6 pb-4 border-b border-neutral-100 flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-warning-100/50 to-transparent rounded-bl-[100px] -z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-center z-10">
              <Badge variant="warning" className="flex items-center gap-1.5 shadow-sm border-warning-200">
                <AlertTriangle className="h-3 w-3" />
                {d.status || 'Pendente'}
              </Badge>
              <span className="text-xs font-semibold text-neutral-400">
                {new Date(d.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
            
            <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug line-clamp-2 z-10 mt-1" title={d.no_entidade}>
              {d.no_entidade}
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 bg-neutral-50/50">
            {editingId === d.id ? (
              <textarea 
                value={editDesc} 
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full p-4 text-sm text-neutral-900 bg-white border border-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-inner resize-none transition-shadow"
                rows={4}
                autoFocus
              />
            ) : (
              <div className="relative pl-4">
                <div className="absolute left-0 top-1 bottom-1 w-1 bg-warning-400 rounded-full opacity-60"></div>
                <p className="text-neutral-700 text-sm leading-relaxed italic">
                  "{d.descricao}"
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-end gap-2">
            {editingId === d.id ? (
              <>
                <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition-all">
                  <X className="h-4 w-4" /> Cancelar
                </button>
                <button onClick={() => handleUpdate(d.id)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow rounded-xl transition-all">
                  <Check className="h-4 w-4" /> Salvar
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setEditingId(d.id);
                    setEditDesc(d.descricao);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors"
                >
                  <Edit2 className="h-4 w-4" /> Editar
                </button>
                <button 
                  onClick={() => handleDelete(d.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-critical-700 bg-critical-50 hover:bg-critical-100 rounded-xl transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Excluir
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
