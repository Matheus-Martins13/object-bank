'use client';

import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { CategoryDto } from '@/dtos/category.dto';
import { updateCategory } from '@/services/axios';

import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

export const EditCategoryModal = ({
  category,
  loadCategories,
}: {
  category: CategoryDto;
  loadCategories: () => {};
}) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>(category.name);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleName = async (event: any) => {
    setName(event.target.value);
  };

  const handleSave = async () => {
    if (!name)
      return toast.error('Você não pode salvar a categoria sem um nome');
    try {
      const response = await updateCategory(category.idCategory, name);
      if (response.error) return toast.error(response.message);
      toast.success('Categoria atualizada com sucesso');
      setTimeout(() => {
        loadCategories();
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-blue-400">
        <EditIcon color="primary" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-black">Editando categoria '{category.name}'</h1>

          <label htmlFor="category-name" className="text-black mt-4 block">
            Nome da categoria:
          </label>
          <input
            type="text"
            name=""
            id="category-name"
            value={name}
            onChange={handleName}
            placeholder="Nome da categoria"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <button
            className="mt-9 p-2 text-white"
            style={{ backgroundColor: '#333' }}
            onClick={handleSave}
          >
            Salvar
          </button>
        </Box>
      </Modal>
    </div>
  );
};
