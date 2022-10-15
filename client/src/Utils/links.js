import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: "",
  },
  {
    id: 2,
    text: "all recipes",
    path: "all-recipes",
    icon: <MenuBookOutlinedIcon />,
  },
  {
    id: 3,
    text: "own recipes",
    path: "own-recipes",
    icon: <PermContactCalendarIcon />,
  },
  { id: 4, text: "add recipe", path: "add-recipe", icon: <AddCircleIcon /> },
  { id: 5, text: "profile", path: "profile", icon: "" },
];
