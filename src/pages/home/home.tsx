import { Layout } from "../../shared/layout";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../react-query/keys";
import { api } from "../../service/api";
import { useEffect } from "react";

import React from "react";
import { ImageCard as TypeCard } from "../../types";
import { Skeleton } from "../../components/skeleton";
import { Button, Flex, Grid } from "@radix-ui/themes";

import { ImageCard } from "../../components/image-card";

const LIMIT = 10;
const ARRAY = [...Array(10).keys()];

export function Home() {
  const { ref, inView } = useInView();

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [QueryKeys.GET_IMAGES],
      async ({ pageParam = 1 }) => {
        const res = await api.get<TypeCard[]>(
          `/v2/list?page=${pageParam}&limit=${LIMIT}`
        );
        return res.data;
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.length === LIMIT ? allPages.length + 1 : undefined;
          return nextPage;
        },
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Layout>
      <Grid columns="3" width="auto" gap="3">
        {status === "loading" ? (
          ARRAY.map((_, index) => <Skeleton key={index} />)
        ) : status === "error" ? (
          <span>"Ha ocurrido un error."</span>
        ) : (
          data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.map((card) => (
                <ImageCard key={card.id} card={card} />
              ))}
            </React.Fragment>
          ))
        )}
      </Grid>
      <Flex justify={"center"} mt="5">
        <Button
          ref={ref}
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </Layout>
  );
}