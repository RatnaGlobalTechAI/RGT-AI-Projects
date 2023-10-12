export interface sideBarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerClose: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
