import { createContext, useContext, useEffect, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useState } from "react";
import type { ISupplementDto } from "../../../2-shared/types/supplement";

interface ISupplementsContext {
    supplements: ISupplementDto[],
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

const SupplementsContext = createContext<ISupplementsContext>({
    supplements: [],
    loading: true,
    setLoading: () => { }
});

const API_URL = import.meta.env.VITE_API_URL

export function SupplementsProvider({ children }: { children: ReactNode }) {
    const [supplements, setSupplements] = useState<ISupplementDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSupplements = async () => {
            try {
                const res = await fetch(`${API_URL}/api/user/supplement`);
                if (!res.ok) {
                    throw new Error("Failed to load products");
                }
                const data = await res.json();
                setSupplements(data)
            } catch (err) {
                const error = err as Error
                console.log(error.message)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        fetchSupplements();
    }, []);

    return (
        <SupplementsContext.Provider value={{ supplements, loading, setLoading }}>
            {children}
        </SupplementsContext.Provider>
    )

}

export function useSupplements() {
    return useContext(SupplementsContext)
}