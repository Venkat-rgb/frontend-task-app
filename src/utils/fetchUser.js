export const fetchUser = async () => {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);

    setUser(data.user);
  } catch (err) {
    console.error(err.message);
  }
};
