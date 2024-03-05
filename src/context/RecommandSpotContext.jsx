import React, { createContext, useContext, useState } from 'react'

export const RecommandSpotContext = createContext();

export function RecommandSpotProvider({children}) {
    return (
        <RecommandSpotContext.Provider value={{}}>
            {children}
        </RecommandSpotContext.Provider>
    )
}

export function useSpotContext(){
    return useContext(RecommandSpotContext);
}