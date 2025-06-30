import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, increment, setDoc, query, where } from 'firebase/firestore';

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

// Save post to Firestore
export const savePost = async (post: { title: string; content: string; author: string; cid: string; imageCid?: string; category: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef.id;
  } catch (error) {
    console.error('Error saving post to Firestore:', error);
    throw error;
  }
};

// Save comment to Firestore
export const saveComment = async (comment: { postId: string; commentCid: string; author: string; timestamp: number; parentCommentId?: string }) => {
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
export const fetchPosts = async (category?: string) => {
  try {
    const postsCollection = collection(db, 'posts');
    const q = category ? query(postsCollection, where('category', '==', category)) : postsCollection;
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc, index) => ({
      id: index + 1,
      ...doc.data(),
      firestoreId: doc.id,
    })) as { id: number; title: string; content: string; author: string; cid: string; imageCid?: string; category: string; firestoreId: string }[];
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    throw error;
  }
};

// Fetch posts by author
export const fetchPostsByAuthor = async (author: string) => {
  try {
    const q = query(collection(db, 'posts'), where('author', '==', author));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc, index) => ({
      id: index + 1,
      ...doc.data(),
      firestoreId: doc.id,
    })) as { id: number; title: string; content: string; author: string; cid: string; imageCid?: string; category: string; firestoreId: string }[];
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    throw error;
  }
};

// Fetch comments for a post
export const fetchComments = async (postId: string) => {
  try {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), firestoreId: doc.id })) as {
      postId: string;
      commentCid: string;
      author: string;
      timestamp: number;
      parentCommentId?: string;
      firestoreId: string;
    }[];
  } catch (error) {
    console.error('Error fetching comments from Firestore:', error);
    throw error;
  }
};

// Fetch comments by author
export const fetchCommentsByAuthor = async (author: string) => {
  try {
    const q = query(collection(db, 'comments'), where('author', '==', author));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), firestoreId: doc.id })) as {
      postId: string;
      commentCid: string;
      author: string;
      timestamp: number;
      parentCommentId?: string;
      firestoreId: string;
    }[];
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
  }
};

// Fetch post views
export const fetchPostViews = async (postId: string) => {
  try {
    const viewRef = doc(db, 'postViews', postId);
    const docSnap = await getDocs(collection(db, 'postViews')).then((snapshot) =>
      snapshot.docs.find((doc) => doc.id === postId)
    );
    return docSnap?.data()?.views || 0;
  } catch (error) {
    console.error('Error fetching post views:', error);
    return 0;
  }
};