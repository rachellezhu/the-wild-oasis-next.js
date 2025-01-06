export default function FilterButton({
  filter,
  handleFilter,
  activeFilter,
  children,
}: {
  filter: "all" | "small" | "medium" | "large";
  handleFilter: () => void;
  activeFilter: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}
