import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // Reemplaza con la URL base de tu API
});

export interface Feature {
  id: number;
  type: string;
  attributes: {
    external_id: string;
    magnitude: number;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
  links: {
    external_url: string;
  };
}

export interface Comment {
  id: number;
  body: string;
  feature_id: number;
  created_at: string;
  updated_at: string;
}

interface GetFeaturesResponse {
  data: Feature[];
  meta: {
    pagination: {
      current_page: number;
      total: number;
      per_page: number;
    };
  };
}

export const getFeatures = async (
  page: number,
  perPage: number,
  filters: any
): Promise<GetFeaturesResponse> => {
  try {
    const response: AxiosResponse<GetFeaturesResponse> = await api.get('/features', {
      params: {
        page,
        per_page: perPage,
        filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

export const getFeature = async (id: number): Promise<Feature> => {
  try {
    const response: AxiosResponse<{ data: Feature }> = await api.get(`/features/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching feature:', error);
    throw error;
  }
};

export const createComment = async (featureId: number, body: string): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await api.post(`/features/${featureId}/comments`, {
      comment: {
        body,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};