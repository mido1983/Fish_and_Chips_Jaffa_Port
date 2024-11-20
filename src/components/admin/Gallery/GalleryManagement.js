import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import GalleryItemModal from './GalleryItemModal';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';
import OptimizedImage from '../../common/Image/OptimizedImage';

const GalleryWrapper = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.gray};
  
  ${({ isDragging }) => isDragging && `
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  `}
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  opacity: 0;
  transition: opacity 0.2s ease;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const DragHandle = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.small};
  left: ${({ theme }) => theme.spacing.small};
  color: white;
  cursor: grab;
`;

function GalleryManagement() {
  const { t } = useTranslation();
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);

    try {
      await fetch('/api/admin/gallery/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: items.map((item, index) => ({ id: item.id, order: index })) }),
      });
    } catch (error) {
      console.error('Error reordering gallery images:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <GalleryWrapper>
      <Header>
        <h2>{t('admin.gallery.title')}</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedImage(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> {t('admin.gallery.addImage')}
        </Button>
      </Header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <GalleryGrid ref={provided.innerRef} {...provided.droppableProps}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <GalleryItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isDragging={snapshot.isDragging}
                    >
                      <DragHandle {...provided.dragHandleProps}>
                        <FaGripVertical />
                      </DragHandle>
                      <OptimizedImage
                        src={image.url}
                        alt={image.description}
                        height="200px"
                      />
                      <ImageOverlay>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedImage(image);
                            setIsModalOpen(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="error"
                          onClick={() => {
                            setSelectedImage(image);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </ImageOverlay>
                    </GalleryItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </GalleryGrid>
          )}
        </Droppable>
      </DragDropContext>

      {isModalOpen && (
        <GalleryItemModal
          image={selectedImage}
          onSave={fetchGalleryImages}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          item={selectedImage}
          onConfirm={() => {
            setSelectedImage(null);
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => {
            setSelectedImage(null);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </GalleryWrapper>
  );
}

export default GalleryManagement; 