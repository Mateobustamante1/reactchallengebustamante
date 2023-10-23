import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../shared/layout";
import { useImageById } from "../../hooks/image-service/useImageById";
import { ImageCard } from "../../components/image-card";
import { Skeleton } from "../../components/skeleton";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useImageById(id);

  if (data) {
    return (
      <Layout>
        <IconButton onClick={() => navigate(-1)} m="5" variant="soft">
          <ArrowLeftIcon />
        </IconButton>
        <ImageCard detailed card={data} />
      </Layout>
    );
  }
  return (
    <Layout>
      <Skeleton width={"100%"} height={700} />
    </Layout>
  );
}