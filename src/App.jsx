import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader } from "./components/Loader";
import { Message } from "./components/Message";
import { PostCard } from "./components/PostCard";
import { SearchInput } from "./components/SearchInput";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPosts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [posts, searchText]);

  return (
    <div className="app">
      <main className="container">
        <h1>Posts Search App</h1>

        <p className="description">
          Приложение загружает список постов из API и позволяет искать их по
          заголовку.
        </p>

        <SearchInput value={searchText} onChange={setSearchText} />

        {!isLoading && !error && (
          <p className="count">Найдено: {filteredPosts.length}</p>
        )}

        {isLoading && <Loader />}

        {error && (
          <Message
            title="Произошла ошибка"
            text={error}
            buttonText="Попробовать снова"
            onButtonClick={getPosts}
          />
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <Message
            title="Ничего не найдено"
            text="Попробуйте ввести другой текст."
          />
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <div className="posts">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} title={post.title} body={post.body} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;