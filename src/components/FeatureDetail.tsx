import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import {
  Feature,
  createComment,
  getFeature,
} from "../services/features-service";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";

function FeatureDetail() {
  const { id } = useParams<{ id: string }>();
  const [feature, setFeature] = useState<Feature | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const data = await getFeature(Number(id));
        setFeature(data);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    fetchFeature();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdComment = await createComment(Number(id), commentBody);
      setComments([...comments, createdComment]);
      setCommentBody("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (!feature) {
    return <Typography>Loading...</Typography>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box p={2}>
      {/* Renderiza los detalles de la característica */}
      <IconButton
        color="primary"
        onClick={handleGoBack}
        sx={{ mb: 2 }}
        aria-label="Volver"
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            {feature.attributes.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Magnitude:</strong> {feature.attributes.magnitude}
          </Typography>
          <Typography>
            <strong>Place:</strong> {feature.attributes.place}
          </Typography>
          <Typography>
            <strong>Time:</strong>{" "}
            {new Date(feature.attributes.time).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Tsunami:</strong>{" "}
            {feature.attributes.tsunami ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Magnitude Type:</strong> {feature.attributes.mag_type}
          </Typography>
          <Typography>
            <strong>Coordinates:</strong>{" "}
            {feature.attributes.coordinates.longitude},{" "}
            {feature.attributes.coordinates.latitude}
          </Typography>
          <Typography>
            <strong>External URL:</strong>{" "}
            <a
              href={feature.links.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          </Typography>
        </Grid>
      </Grid>
      <Box marginTop={4} component="form" onSubmit={handleCommentSubmit}>
        <Typography>
          <strong>Leave a comment:</strong>
        </Typography>
        <TextField
          label="Comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Comment
        </Button>
      </Box>
      <Box m={2}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem>
                <ListItemText
                  primary={comment.body}
                  secondary={comment.created_at}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default FeatureDetail;
