import { Layout } from "../../shared/layout";
import { ImageCard } from "../../components/image-card";
import { useSaveImages } from "../../stores/useSaveImages";
import { Grid, Text } from "@radix-ui/themes";

export function MyImages() {
  const myCards = useSaveImages((state) => state.cards);
  const noCards = myCards.length === 0;

  return (
    <Layout>
      <Grid columns="3" width="auto" gap="3">
        {noCards ? (
          <Text size="5" weight="bold">
            You have not saved any card yet.
          </Text>
        ) : (
          myCards?.map((card) => <ImageCard key={card.id} card={card} />)
        )}
      </Grid>
    </Layout>
  );
}
