(() => {
  const toast = document.getElementById("toast");
  const loginButtons = [
    document.getElementById("login-link"),
    document.getElementById("hero-login")
  ];

  function showMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 4500);
  }

  const configured =
    window.SUPABASE_URL &&
    window.SUPABASE_ANON_KEY &&
    !window.SUPABASE_URL.includes("COLE_AQUI") &&
    !window.SUPABASE_ANON_KEY.includes("COLE_AQUI");

  if (!configured || !window.supabase) {
    loginButtons.forEach(button => button?.addEventListener("click", () => {
      showMessage("Configure o Supabase no arquivo config.js antes de habilitar o login.");
    }));
    return;
  }

  const client = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );

  async function loginWithGitHub() {
    const { error } = await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/painel.html`
      }
    });
    if (error) showMessage(`Não foi possível iniciar o login: ${error.message}`);
  }

  loginButtons.forEach(button => button?.addEventListener("click", loginWithGitHub));

  client.auth.getSession().then(({ data }) => {
    const link = document.getElementById("login-link");
    if (data.session && link) {
      link.textContent = "Meu painel";
      link.href = "painel.html";
      link.removeAttribute("id");
    }
  });
})();
