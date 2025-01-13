'use client'

import Router from "next/router"

export function onClickRoute( route ){
    const router = Router();
    router.push(route)
}   