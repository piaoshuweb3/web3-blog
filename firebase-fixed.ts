import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, increment, setDoc, query, where, getDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Type definitions
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  cid: string;
  imageCid?: string;
  category: string;
  createdAt: number;
  updatedAt: number;
  firestoreId: string;
}

export interface Comment {
  postId: string;
  commentCid: string;
  author: string;
  timestamp: number;
  parentCommentId?: string;
  firestoreId: string;
}

// Save post to Firestore
export const savePost = async (post: Omit<Post, 'id' | 'firestoreId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const timestamp = Date.now();
    const postData = {
      ...post,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const docRef = await addDoc(collection(db, 'posts'), postData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving post to Firestore:', error);
    throw error;
  }
};

// Update post in Firestore
export const updatePost = async (firestoreId: string, updates: Partial<Omit<Post, 'id' | 'firestoreId' | 'createdAt'>>) => {
  try {
    const updateData = {
      ...updates,
      updatedAt: Date.now(),
    };
    await updateDoc(doc(db, 'posts', firestoreId), updateData);
  } catch (error) {
    console.error('Error updating post in Firestore:', error);
    throw error;
  }
};

// Save comment to Firestore
export const saveComment = async (comment: Omit<Comment, 'firestoreId'>) => {
  try {
    const docRef = await addDoc(collection(db, 'comments'), comment);
    return docRef.id;
  } catch (error) {
    console.error('Error saving comment to Firestore:', error);
    throw error;
  }
};

// Update comment in Firestore
export const updateComment = async (firestoreId: string, comment: { commentCid: string; timestamp: number }) => {
  try {
    await updateDoc(doc(db, 'comments', firestoreId), comment);
  } catch (error) {
    console.error('Error updating comment in Firestore:', error);
    throw error;
  }
};

// Delete comment from Firestore
export const deleteComment = async (firestoreId: string) => {
  try {
    await deleteDoc(doc(db, 'comments', firestoreId));
  } catch (error) {
    console.error('Error deleting comment from Firestore:', error);
    throw error;
  }
};

// Fetch posts from Firestore
export const fetchPosts = async (category?: string): Promise<Post[]> => {
  try {
    const postsCollection = collection(db, 'posts');
    const q = category ? query(postsCollection, where('category', '==', category)) : postsCollection;
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // 使用Firestore文档ID作为唯一标识
      ...doc.data(),
      firestoreId: doc.id,
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    throw error;
  }
};

// Fetch posts by author
export const fetchPostsByAuthor = async (author: string): Promise<Post[]> => {
  try {
    const q = query(collection(db, 'posts'), where('author', '==', author));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // 使用Firestore文档ID作为唯一标识
      ...doc.data(),
      firestoreId: doc.id,
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    throw error;
  }
};

// Fetch single post by ID
export const fetchPostById = async (postId: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        firestoreId: docSnap.id,
      } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};

// Fetch comments for a post
export const fetchComments = async (postId: string): Promise<Comment[]> => {
  try {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({ 
      ...doc.data(), 
      firestoreId: doc.id 
    })) as Comment[];
  } catch (error) {
    console.error('Error fetching comments from Firestore:', error);
    throw error;
  }
};

// Fetch comments by author
export const fetchCommentsByAuthor = async (author: string): Promise<Comment[]> => {
  try {
    const q = query(collection(db, 'comments'), where('author', '==', author));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({ 
      ...doc.data(), 
      firestoreId: doc.id 
    })) as Comment[];
  } catch (error) {
    console.error('Error fetching comments by author:', error);
    throw error;
  }
};

// Delete post from Firestore
export const deletePost = async (firestoreId: string) => {
  try {
    await deleteDoc(doc(db, 'posts', firestoreId));
  } catch (error) {
    console.error('Error deleting post from Firestore:', error);
    throw error;
  }
};

// Track post view
export const trackPostView = async (postId: string) => {
  try {
    const viewRef = doc(db, 'postViews', postId);
    await setDoc(viewRef, { views: increment(1) }, { merge: true });
  } catch (error) {
    console.error('Error tracking post view:', error);
    // 不抛出错误，因为浏览量统计失败不应该影响主要功能
  }
};

// Fetch post views
export const fetchPostViews = async (postId: string): Promise<number> => {
  try {
    const viewRef = doc(db, 'postViews', postId);
    const docSnap = await getDoc(viewRef);
    
    if (docSnap.exists()) {
      return docSnap.data()?.views || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching post views:', error);
    return 0;
  }
};

// Batch operations for better performance
export const batchDeleteComments = async (postId: string) => {
  try {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error batch deleting comments:', error);
    throw error;
  }
};

// Search posts by title or content
export const searchPosts = async (searchTerm: string): Promise<Post[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation that fetches all posts and filters client-side
    // For production, consider using Algolia or similar search service
    const allPosts = await fetchPosts();
    const searchTermLower = searchTerm.toLowerCase();
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(searchTermLower) ||
      post.content.toLowerCase().includes(searchTermLower)
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

export default db;

