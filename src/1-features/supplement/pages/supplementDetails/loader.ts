import type { LoaderFunctionArgs } from "react-router-dom";
import type { ISupplementDto, supplementLoaderType } from "../../../../2-shared/types/supplement";

const API_URL = import.meta.env.VITE_API_URL;

export async function loader({ params }: LoaderFunctionArgs): Promise<supplementLoaderType> {

  const id = params.id;

  try {

    const res = await fetch(`${API_URL}/api/user/supplement/${id}`)

    if (!res.ok) throw new Error("Failed to fetch supplement data");

    const supplementData: ISupplementDto = await res.json();

    return { supplementData, error: null };

  } catch (err) {
    if (err instanceof Error) {
      return { supplementData: null, error: err.message };
    }
    return { supplementData: null, error: "Unknown error" };
  }
}