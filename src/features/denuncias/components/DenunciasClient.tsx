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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {denuncias.map((d) => (
        <div key={d.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="font-bold text-neutral-900 text-lg leading-tight line-clamp-2" title={d.no_entidade}>
                {d.no_entidade}
              </h3>
              <Badge variant="warning" className="shrink-0">{new Date(d.created_at).toLocaleDateString("pt-BR")}</Badge>
            </div>
            
            {editingId === d.id ? (
              <textarea 
                value={editDesc} 
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full p-3 text-sm text-neutral-900 bg-neutral-50 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                rows={4}
                autoFocus
              />
            ) : (
              <p className="text-neutral-600 text-sm leading-relaxed bg-neutral-50 p-4 rounded-lg border border-neutral-100 relative">
                <span className="absolute -top-3 left-2 bg-white px-1 text-xs font-bold text-neutral-400 uppercase">Relato</span>
                "{d.descricao}"
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
            {editingId === d.id ? (
              <>
                <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                  <X className="h-4 w-4" /> Cancelar
                </button>
                <button onClick={() => handleUpdate(d.id)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors">
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" /> Editar
                </button>
                <button 
                  onClick={() => handleDelete(d.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-critical-700 bg-critical-50 hover:bg-critical-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Apagar
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
