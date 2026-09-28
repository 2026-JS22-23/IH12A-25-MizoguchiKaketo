import './App.css'
import { useState } from 'react';

/** 絞り込みタブの定義（キー: ラベル, 値: 残す条件） */
const FILTERS = {
  all: { label: 'すべて', match: () => true },
  active: { label: '未完了', match: todo => !todo.done },
  done: { label: '完了', match: todo => todo.done },
};

/** 今日の日付をyyyy/mm/ddの形で返す */
const formatToday = () =>
  new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

/**
 * Todoリスト本体のコンポーネント
 * @returns {JSX.Element} Appコンポーネント
 */
export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const add = e => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    setTodos([...todos, { id: crypto.randomUUID(), text: trimmedText, done: false }]);
    setText('');
  };

  const toggle = id =>
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));

  const remove = id => setTodos(todos.filter(todo => todo.id !== id));

  const clearDone = () => setTodos(todos.filter(todo => !todo.done));

  const visibleTodos = todos.filter(FILTERS[filter].match);
  const doneCount = todos.filter(todo => todo.done).length;
  const progress = todos.length === 0 ? 0 : (doneCount / todos.length) * 100;

  return (
    <div className="app">
      <header className="top">
        <div>
          <p className="date">{formatToday()}</p>
          <h1>やることリスト</h1>
        </div>
        <p className="summary">
          残り <strong>{todos.length - doneCount}</strong> 件
          <span>全 {todos.length} 件 · {Math.round(progress)}%</span>
        </p>
      </header>

      <main className="main">
        <nav className="tabs" aria-label="絞り込み">
          {Object.entries(FILTERS).map(([key, { label }]) => (
            <button
              key={key}
              className={key === filter ? 'tab is-active' : 'tab'}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <form className="form" onSubmit={add}>
            <input
              className="input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="次にやることは？"
            />
            <button className="add" type="submit" disabled={!text.trim()}>
              追加
            </button>
          </form>

          {visibleTodos.length === 0 ? (
            <p className="empty">
              {todos.length === 0 ? 'まだ何もありません。上の欄から追加してみましょう。' : 'このタブに表示するものはありません。'}
            </p>
          ) : (
            <ul className="list">
              {visibleTodos.map(todo => (
                <li key={todo.id} className={todo.done ? 'item is-done' : 'item'}>
                  <label className="check">
                    <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
                    <span className="box" />
                    <span className="text">{todo.text}</span>
                  </label>
                  <button className="delete" onClick={() => remove(todo.id)} aria-label="削除">
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="meter" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <button className="clear" onClick={clearDone} disabled={doneCount === 0}>
            完了済みを削除
          </button>
        </main>
    </div>
  );
}
