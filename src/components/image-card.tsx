import { BookmarkIcon, DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { AspectRatio, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { ImageCard as CardType } from "../types";
import { downloadImage } from "../helpers/download";
import { toast } from "sonner";
import { useSaveImages } from "../stores/useSaveImages";
import { motion } from "framer-motion";

interface ImageCardProps {
  card: CardType;
  detailed?: boolean;
}

export function ImageCard({ card, detailed }: ImageCardProps) {
  const saveCard = useSaveImages((state) => state.saveCard);
  const removeCard = useSaveImages((state) => state.removeCard);
  const cards = useSaveImages((state) => state.cards);
  function handleDownload() {
    downloadImage(card.download_url, "newFileName")
      .then(() => {
        toast.success("Downloaded!!");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  const isSavedAlready = cards.find((i) => i.id === card.id);
  function handleSave() {
    if (isSavedAlready) {
      removeCard(isSavedAlready.id);
      return toast.success("Image has been deleted!");
    }
    saveCard(card);

    toast.success("Image has been saved!");
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      layout
      key={card.id}
    >
      <Card>
        <AspectRatio ratio={16 / 8}>
          <Link aria-disabled={detailed} to={`/images/${card.id}`}>
            <img
              src={card.download_url}
              alt={`A picture of the author ${card.author}`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 6,
              }}
            />
          </Link>
        </AspectRatio>
        <Flex mt="3" direction="column" gap="1">
          <Text size="1">width: {card.width}</Text>
          <Text size="1">height: {card.height}</Text>
          <Text size="1">download url: {card.download_url}</Text>
        </Flex>
        <Flex mt="4" justify="between">
          <Text weight="bold">Author: {card.author}</Text>
          <Flex gap="3">
            <IconButton
              onClick={handleSave}
              variant="outline"
              color={isSavedAlready ? "red" : "blue"}
            >
              {isSavedAlready ? <TrashIcon color="red" /> : <BookmarkIcon />}
            </IconButton>

            <IconButton onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
}
