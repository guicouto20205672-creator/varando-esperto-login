// Configure com a URL e a chave PUBLICA (anon/publishable) do seu projeto Supabase.
// Nunca coloque a service_role key no navegador.
const SUPABASE_URL = "COLE_A_URL_DO_SEU_PROJETO";
const SUPABASE_ANON_KEY = "COLE_A_CHAVE_PUBLICA_ANON";
const $ = id => document.getElementById(id);
$("year").textContent = new Date().getFullYear();
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_URL.includes("COLE_") && SUPABASE_ANON_KEY.length > 20 && !SUPABASE_ANON_KEY.includes("COLE_");
let client = null;
if (configured && window.supabase) client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); else $("configNote").style.display = "block";
function msg(text,type){$("message").textContent=text;$("message").className="message show "+type}
$("togglePassword").addEventListener("click",()=>{const show=$("password").type==="text";$("password").type=show?"password":"text";$("togglePassword").textContent=show?"Mostrar":"Ocultar"});
$("loginForm").addEventListener("submit",async e=>{e.preventDefault();if(!client){msg("A tela está pronta, mas falta configurar o Supabase no arquivo app.js.","error");return}const btn=$("submitButton");btn.disabled=true;btn.textContent="Verificando acesso...";try{const {error}=await client.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});if(error)throw error;msg("Login realizado! Configure o redirecionamento para o painel do sistema.","success");}catch(error){msg(error.message==="Invalid login credentials"?"E-mail ou senha incorretos.":"Não foi possível entrar. Confira os dados e tente novamente.","error")}finally{btn.disabled=false;btn.textContent="Entrar no sistema →"}});
$("forgotPassword").addEventListener("click",async e=>{e.preventDefault();const email=$("email").value.trim();if(!email){msg("Digite seu e-mail no campo acima para recuperar a senha.","error");$("email").focus();return}if(!client){msg("Configure o Supabase no arquivo app.js para ativar a recuperação de senha.","error");return}try{const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});if(error)throw error;msg("Se esse e-mail estiver cadastrado, você receberá as instruções de recuperação.","success")}catch{msg("Não foi possível solicitar a recuperação agora. Tente novamente mais tarde.","error")}});
