import { useState, useEffect } from 'react';
import { db } from '../db/firebase';

export default function useTodos(userId) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userId) {
      db.collection('users')
        .doc(userId)
        .collection('todos')
        .onSnapshot(
          (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({
                id: doc.id,
                todo: doc.data().todo,
                timestamp: doc.data().timestamp,
                completed: doc.data().completed,
              });
            });
            setTodos(docs);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }, [userId]);

  return todos;
}
