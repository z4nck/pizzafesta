(() => {
  const toast = document.getElementById("toast");
  const configured =
    window.SUPABASE_URL &&
    window.SUPABASE_ANON_KEY &&
    !window.SUPABASE_URL.includes("COLE_AQUI") &&
    !window.SUPABASE_ANON_KEY.includes("COLE_AQUI");

  if (!configured || !window.supabase) {
    document.getElementById("user-name").textContent = "Supabase não configurado";
    toast.textContent = "Preencha o arquivo config.js e configure o provedor GitHub no Supabase.";
    toast.classList.add("show");
    return;
  }

  const client = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );

  async function loadUser() {
    const { data, error } = await client.auth.getSession();
    if (error || !data.session) {
      window.location.replace("index.html");
      return;
    }

    const user = data.session.user;
    const metadata = user.user_metadata || {};
    const username = metadata.user_name || metadata.preferred_username || "";
    const name = metadata.full_name || metadata.name || username || user.email || "Usuário";
    const avatar = metadata.avatar_url || "";
    const profile = username ? `https://github.com/${encodeURIComponent(username)}` : "https://github.com";

    document.getElementById("user-name").textContent = name;
    document.getElementById("avatar").src = avatar;
    document.getElementById("user-link").href = profile;
  }

  document.getElementById("logout").addEventListener("click", async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      toast.textContent = "Não foi possível sair. Tente novamente.";
      toast.classList.add("show");
      return;
    }
    window.location.replace("index.html");
  });

  loadUser();
})();
