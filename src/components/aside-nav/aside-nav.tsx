import styles from "./aside-nav.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigationModal } from "../../stores/useNavigationModal";
import { Avatar, Button, Flex } from "@radix-ui/themes";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUser";
import { useSaveImages } from "../../stores/useSaveImages";

export function AsideNav() {
  const name = useUser((state) => state.name);
  const isVisible = useNavigationModal((state) => state.isVisible);
  const setIsVisible = useNavigationModal((state) => state.setIsVisible);
  const clearUserStorage = useUser.persist.clearStorage;
  const clearSavedImages = useSaveImages.persist.clearStorage;
  const navigate = useNavigate();

  function handleLogout() {
    setIsVisible();
    navigate("/");
    clearSavedImages();
    clearUserStorage();
  }
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "tween" }}
            className={styles.aside}
          >
            <Flex direction="column">
              <Flex align="center" gap="5">
                <Avatar
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="S"
                  size="7"
                />
                <h3>{name}</h3>
              </Flex>

              <Flex direction="column" gap="4" p="4">
                <NavLink to="/images" onClick={() => setIsVisible()}>
                  Inicio
                </NavLink>
                <NavLink to="/my-images" onClick={() => setIsVisible()}>
                  Mis imagenes
                </NavLink>
              </Flex>
            </Flex>

            <Flex direction="column">
              <Button onClick={handleLogout} variant="ghost" color="red">
                Cerrar sesión
              </Button>
            </Flex>
          </motion.aside>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={setIsVisible}
            className={styles.overlay}
          />
        </>
      )}
    </AnimatePresence>
  );
}
