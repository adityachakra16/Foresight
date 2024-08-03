import { toCamelCase, toSnakeCase } from "@/utils";

async function send(route: string, init?: RequestInit): Promise<Response> {
  if (init?.body) {
    init.body = JSON.stringify(toSnakeCase(JSON.parse(init.body as string)));
  }
  const url = `${process.env.NEXT_PUBLIC_API_URL}${route}`;
  const response = await fetch(url, init);
  if (response.ok) {
    const res = await response.json();
    return toCamelCase(res);
  } else {
    try {
      const jsonResponse = await response.json();
      throw new Error(jsonResponse.message);
    } catch (err) {
      throw new Error(
        `Could not parse error message. Response is ${response.status}`
      );
    }
  }
}

export async function sendWithToast(
  route: string,
  init?: RequestInit
): Promise<any> {
  try {
    return await send(route, init);
  } catch (err: any) {
    console.error({ err });
    return false;
  }
}

export async function sendRequest(
  route: string,
  init?: RequestInit
): Promise<any> {
  try {
    return await send(route, init);
  } catch (err) {
    console.error({ err });
    return false;
  }
}
