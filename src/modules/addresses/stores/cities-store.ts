import createZustandSelectors from '@/modules/core/utils/zustand/create-zustand-selectors';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { CityEntity } from '../utils/types';

type CitiesState = {
    loadedGovernments: string[];
    records: CityEntity[];

    currentGovernmentCities: (governmentId: string) => CityEntity[];
    isGovernmentLoaded: (governmentId: string) => boolean;

    addCities: (governmentId: string, cities: CityEntity[]) => void;
};

export const citiesStore = create<CitiesState>()(
    devtools(
        persist(
            (set, get) => ({
                records: [],
                loadedGovernments: [],

                currentGovernmentCities: (governmentId: string) =>
                    get().records.filter(
                        (city) => city.government_id === governmentId
                    ),
                isGovernmentLoaded: (governmentId: string) =>
                    get().loadedGovernments.includes(governmentId),

                addCities: (governmentId: string, cities: CityEntity[]) => {
                    set((state) => ({
                        records: [
                            ...state.records,
                            ...cities.filter(
                                (city) =>
                                    !state.records.some((c) => c.id === city.id)
                            ),
                        ],
                        loadedGovernments: [
                            ...state.loadedGovernments,
                            governmentId,
                        ],
                    }));
                },
            }),
            {
                name: 'cities_store',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);

export const useCitiesStore = createZustandSelectors(citiesStore);
