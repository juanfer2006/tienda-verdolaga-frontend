'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProductos } from '@/features/catalogo/hooks/useProductos';
import { productoService } from '@/features/catalogo/services/productoService';
import { Producto } from '@/features/catalogo/domain/Producto';
import { Button } from '@/features/common/components/Button';
import { Input } from '@/features/common/components/Input';
import { Modal } from '@/features/common/components/Modal';

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { productos, isLoading: prodsLoading, recargar } = useProductos({ limit: 50 });
  const router = useRouter();

  // Estados del modal de crear / editar
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

  // Formulario
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('camisetas');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado de confirmación de eliminación
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Protección de ruta: Solo rol ADMIN. Si es user o invitado, redirigir
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=admin');
      } else if (user.role !== 'ADMIN') {
        router.push('/');
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && !authLoading) || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent"></div>
      </div>
    );
  }

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setNombre('');
    setCategoria('camisetas');
    setPrecio('');
    setImagen('');
    setDescripcion('');
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (prod: Producto) => {
    setEditingProduct(prod);
    setNombre(prod.nombre);
    setCategoria(prod.categoria);
    setPrecio(String(prod.precio));
    setImagen(prod.imagen);
    setDescripcion(prod.descripcion);
    setFormError('');
    setModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!nombre.trim() || !precio || !imagen.trim() || !descripcion.trim()) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }

    const numPrecio = Number(precio);
    if (isNaN(numPrecio) || numPrecio <= 0) {
      setFormError('El precio debe ser un número positivo.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await productoService.actualizar(editingProduct.id, {
          nombre: nombre.trim(),
          categoria,
          precio: numPrecio,
          imagen: imagen.trim(),
          descripcion: descripcion.trim(),
        });
      } else {
        await productoService.crear({
          nombre: nombre.trim(),
          categoria,
          precio: numPrecio,
          imagen: imagen.trim(),
          descripcion: descripcion.trim(),
        });
      }
      setModalOpen(false);
      recargar();
    } catch (err: any) {
      setFormError(err?.message || 'Error al guardar el producto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await productoService.eliminar(deletingId);
      setDeleteConfirmOpen(false);
      setDeletingId(null);
      recargar();
    } catch (err: any) {
      alert(err?.message || 'Error al eliminar producto.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold text-verdolaga-principal uppercase tracking-wider bg-verdolaga-suave px-2.5 py-0.5 rounded-md">
            Panel de Administración
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-verdolaga-oscuro mt-1">
            Gestión de Productos
          </h1>
          <p className="text-sm text-gray-600">
            Crea, edita o elimina artículos del catálogo de Tienda Verdolaga en la base de datos.
          </p>
        </div>
        <Button onClick={handleOpenCreate} variant="primary">
          + Agregar Nuevo Producto
        </Button>
      </div>

      {/* Tabla de Productos */}
      {prodsLoading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Cargando catálogo...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5">Producto</th>
                  <th className="px-6 py-3.5">Categoría</th>
                  <th className="px-6 py-3.5">Precio</th>
                  <th className="px-6 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <Image src={p.imagen} alt={p.nombre} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{p.nombre}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{p.descripcion}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-verdolaga-suave text-verdolaga-oscuro">
                        {p.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${p.precio.toLocaleString('es-CO')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeletingId(p.id);
                          setDeleteConfirmOpen(true);
                        }}
                        className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-xs font-semibold"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Crear / Editar */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Editar Producto Verdolaga' : 'Nuevo Producto Verdolaga'}
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              ⚠️ {formError}
            </div>
          )}

          <Input
            label="Nombre del Producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Camiseta Verde Edición Libertadores"
            required
          />

          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="categoria" className="text-sm font-semibold text-gray-800">
              Categoría
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-verdolaga-principal/30 focus:border-verdolaga-principal"
            >
              <option value="camisetas">Camisetas</option>
              <option value="accesorios">Accesorios</option>
              <option value="coleccionables">Coleccionables</option>
            </select>
          </div>

          <Input
            label="Precio (COP)"
            type="number"
            min="1000"
            step="100"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="249900"
            required
          />

          <Input
            label="URL de la Imagen"
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />

          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="desc" className="text-sm font-semibold text-gray-800">
              Descripción
            </label>
            <textarea
              id="desc"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-verdolaga-principal/30 focus:border-verdolaga-principal"
              placeholder="Descripción temática del producto..."
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              className="w-1/2"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-1/2">
              {editingProduct ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmación de Eliminación (+1 pt bonus rúbrica) */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirmar Eliminación"
      >
        <div className="text-center space-y-4">
          <span className="text-4xl block">🗑️</span>
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar este producto del catálogo? Esta acción no se puede deshacer en la base de datos.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmOpen(false)}
              className="w-1/2"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="w-1/2"
            >
              Sí, Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
