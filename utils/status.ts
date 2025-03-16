export const determineBadgeClass = (
  status: "finished" | "open" | "in_progress"
) => {
  switch (status) {
    case "finished":
      return "bg-red-500 hover:bg-red-400";
    case "open":
      return "bg-green-500 hover:bg-green-400";
    case "in_progress":
      return "bg-yellow-500 hover:bg-yellow-400";
    default:
      return "";
  }
};
