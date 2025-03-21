export const httpRoutes = {
  user: {
    login: "/user/login",
    profile: "/user/me",
    register: "/user/register",
  },
  notes: {
    create: "/notes/add",
    get: "/notes/me",
    update: "/notes",
    delete: "/notes",
  },
} as const;
