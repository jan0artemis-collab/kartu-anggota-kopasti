import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../utils/api';
import { CACHE_DURATION } from '../constants';

// Simple in-memory cache
const cache = new Map();

export const useMembers = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const abortControllerRef = useRef(null);

  const fetchMembers = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create cache key
    const cacheKey = JSON.stringify(params);
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setData(cached.data.data || []);
      setTotal(cached.data.total || 0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      abortControllerRef.current = new AbortController();
      const response = await api.getMembers(params, abortControllerRef.current.signal);
      
      setData(response.data || []);
      setTotal(response.total || 0);
      
      // Update cache
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setData([]);
        setTotal(0);
      }
    } finally {
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  }, [params]);

  useEffect(() => {
    fetchMembers();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchMembers]);

  const refetch = useCallback(() => {
    // Clear cache for this query
    const cacheKey = JSON.stringify(params);
    cache.delete(cacheKey);
    fetchMembers();
  }, [params, fetchMembers]);

  return { data, loading, error, total, refetch };
};

export const useMember = (id) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchMember = async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Check cache
      const cacheKey = `member_${id}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setMember(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        abortControllerRef.current = new AbortController();
        const data = await api.getMemberById(id, abortControllerRef.current.signal);
        
        if (data.error) {
          throw new Error(data.message || 'Member not found');
        }
        
        setMember(data);
        
        // Update cache
        cache.set(cacheKey, {
          data: data,
          timestamp: Date.now()
        });
        
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setMember(null);
        }
      } finally {
        if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMember();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id]);

  return { member, loading, error };
};

// Clear all cache
export const clearMembersCache = () => {
  cache.clear();
};
