export function SearchInput({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Поиск по заголовку"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}