<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium">Welcome to Atidone.</p>
    <p>
      A
      <a
        href="https://nuxt.com"
        target="_blank"
        class="text-(--ui-primary)"
        rel="noopener"
        >Nuxt</a
      >
      demo hosted on
      <a
        href="https://pages.cloudflare.com"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
        >Cloudflare Pages</a
      >
      with server-side rendering on the edge and using
      <NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >
        Cloudflare D1 database </NuxtLink
      >.
    </p>
    <p>
      It is made using
      <a href="https://hub.nuxt.com" class="text-(--ui-primary)">NuxtHub</a> for
      a zero-config development & deployment experience on Cloudflare.
    </p>
    <p>
      You can authenticate using your GitHub account or create a local account
      with username and password.
    </p>
    <USeparator />
    <p class="text-sm text-(--ui-text-muted) italic">
      No personal information regarding your accounts are stored beyond what's
      necessary for the app to function.<br />
      We store only the todos created linked with your user account.
    </p>
  </div>
</template>
