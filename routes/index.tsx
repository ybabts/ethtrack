import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import getEthereumPrice from "../src/ethereum.ts";

export default function Home({ data }: PageProps<string[] | null>) {
  if (data === null) {
    data = [];
  }
  return (
    <>
      <Head>
        <title>Ethereum Price</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        {data.map((value) => {
          return (
            <div class="flex flex-row justify-between">
              <div class="flex flex-col">
                <div class="text-2xl">{value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    const ethPrices = await getEthereumPrice().catch((err) => {
      console.error(err);
      return [];
    });
    return ctx.render(ethPrices);
  },
};
