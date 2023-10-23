import { IconButton } from "@radix-ui/themes";
import { AsideNav } from "../components/aside-nav/aside-nav";
import { useNavigationModal } from "../stores/useNavigationModal";
import styles from "./layout.module.css";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Toaster } from "sonner";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const setIsVisible = useNavigationModal((state) => state.setIsVisible);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Toaster position="top-center" />
      <AsideNav />
      <main className={styles.main}>
        <IconButton
          className={styles.icon}
          variant="solid"
          mb="6"
          onClick={setIsVisible}
        >
          <HamburgerMenuIcon width={18} height={18} />
        </IconButton>
        {children}
      </main>
    </motion.div>
  );
}
