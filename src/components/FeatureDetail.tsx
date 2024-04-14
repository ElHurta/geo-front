import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Feature, createComment, getFeature } from '../services/features-service';

function FeatureDetail() {
  const { id } = useParams<{ id: string }>();
  const [feature, setFeature] = useState<Feature | null>(null);
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const data = await getFeature(Number(id));
        setFeature(data);
      } catch (error) {
        console.error('Error fetching feature:', error);
      }
    };

    fetchFeature();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createComment(Number(id), commentBody);
      setCommentBody('');
      // Actualiza la lista de comentarios después de crear un nuevo comentario
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  if (!feature) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{feature.attributes.title}</h2>
      {/* Renderiza los detalles de la característica */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <button type="submit">Submit Comment</button>
      </form>
      {/* Renderiza la lista de comentarios */}
    </div>
  );
}

export default FeatureDetail;