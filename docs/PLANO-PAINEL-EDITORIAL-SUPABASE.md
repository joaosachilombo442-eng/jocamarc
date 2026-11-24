# Plano de implementação — painel editorial e transparência AJOCAMARC

> Documento de preparação técnica. Não representa uma alteração da base de dados nem confirma que o painel já está operacional.

## 1. Estado actual verificado no código

- O conteúdo público é consumido através das funções e `queryOptions` de `src/content/api.ts`.
- Notícias, eventos, projectos, álbuns, cooperativas e parceiros ainda vêm de fontes estáticas locais.
- O formulário de contacto devolve `not-configured`; não existe recepção persistente de mensagens.
- A página de actividades oculta correctamente projectos marcados como demonstração.
- A página de notícias tem pesquisa, categorias, arquivo mensal e galeria de eventos.
- Não existe actualmente uma rota pública de transparência nem uma área editorial administrativa dedicada.
- A associação ainda não forneceu, no conteúdo actualmente integrado, relatórios ou documentos oficiais prontos para publicação. Não criar documentos fictícios nem preencher a área com exemplos que pareçam oficiais.

## 2. Objectivo

Criar uma área administrativa privada para gerir conteúdos institucionais e editoriais, mantendo as páginas públicas e os contratos de `src/content/api.ts`. A administração deve permitir preparar, rever, publicar, agendar, actualizar e arquivar conteúdos sem editar código.

## 3. Perfis e permissões

- **Administrador:** gere utilizadores, permissões, conteúdos e configurações editoriais.
- **Editor:** cria e edita conteúdos, envia ficheiros e submete para publicação.
- **Publicador:** revê e publica, agenda ou retira conteúdos do site.
- **Leitor interno (opcional):** consulta conteúdos e estados sem os alterar.

Aplicar autenticação obrigatória, autorização no servidor e políticas RLS. Nunca confiar apenas em esconder botões no frontend. Não permitir registo público de administradores.

## 4. Módulos editoriais

### Notícias
Campos mínimos: título, slug único, resumo, corpo formatado, categoria, imagem de capa, texto alternativo, autor, local (opcional), data editorial, estado, destaque e metadados SEO.

### Eventos
Campos mínimos: título, descrição, data/hora (opcional enquanto não confirmada), local, cartaz original, texto alternativo, entidade organizadora, estado e ligação para notícia relacionada (opcional).

### Projectos e actividades
Campos mínimos: título, slug, descrição, área temática, estado do projecto, datas e local apenas quando confirmados, instituições envolvidas, imagens originais autorizadas, estado editorial e indicação explícita de conteúdo demonstrativo quando aplicável.

### Documentos e transparência
Registo de documentos com título, tipo/categoria, descrição, entidade responsável, data do documento, período abrangido, ficheiro, formato, tamanho, estado editorial e data de publicação. Categorias iniciais podem ser configuradas como Relatórios, Documentos institucionais, Comunicados e Prestação de contas, mas só apresentar categorias com documentos publicados ou explicar claramente que ainda não há documentos disponíveis. Não inventar relatórios, datas, números ou ficheiros.

### Biblioteca de media
Upload de imagens e documentos para Supabase Storage, com nome original, nome seguro, MIME type, tamanho, dimensões quando aplicável, texto alternativo, legenda, autor/crédito, origem/autorização, data de upload e utilizador responsável. Restringir tipos e tamanhos; validar no servidor.

### Mensagens de contacto
Persistir mensagens recebidas, com nome, contacto, assunto, mensagem, data, estado de tratamento e responsável. Proteger dados pessoais; acesso apenas a perfis autorizados e política de retenção definida pela associação. Não expor mensagens na API pública.

## 5. Ciclo editorial

Estados: `rascunho`, `em_revisao`, `agendado`, `publicado`, `arquivado`.

- Rascunhos e revisão nunca aparecem no site público.
- Publicação agendada só ocorre no momento definido, usando hora de Angola (`Africa/Luanda`) para apresentação e UTC para armazenamento.
- Guardar autor da criação, último editor, publicador e datas de cada transição.
- Registar histórico de alterações e permitir retirar uma publicação do ar sem apagar o registo.
- Slugs devem ser únicos; alterações de slug em conteúdos publicados exigem redireccionamento do URL antigo.

## 6. Integração com o site público

Preservar as assinaturas existentes em `src/content/api.ts`. Substituir as implementações locais por consultas ao backend, mantendo filtros, paginação e ordenação já usados pelas páginas.

A API pública só pode devolver registos publicados e dentro da janela de publicação. Não enviar rascunhos, dados de contacto privados, utilizadores internos ou metadados de segurança ao navegador.

Manter os dados institucionais não confirmados como nulos e apresentar “A confirmar”. Não converter conteúdos demonstrativos em publicações oficiais automaticamente.

## 7. Modelo de dados proposto para Lovable/Supabase

Propor tabelas relacionais para:
- `profiles` (perfil interno ligado a `auth.users`, papel e estado);
- `news_articles` e `news_categories`;
- `events`;
- `projects`;
- `documents`;
- `media_assets`;
- `contact_messages`;
- `content_revisions` ou histórico equivalente.

Usar UUIDs, timestamps, chaves estrangeiras, índices para slug/estado/data e restrições de integridade. Criar políticas RLS por papel e por tipo de registo. Separar Storage público (apenas ficheiros efectivamente publicados e autorizados) de Storage privado (rascunhos, mensagens e ficheiros internos). A definição final das tabelas, triggers, políticas e buckets deve ser executada pelo Lovable, conforme as regras do projecto; não editar migrations manualmente.

## 8. Critérios de aceitação

1. Utilizador não autenticado não consegue abrir o painel nem consultar dados internos.
2. Editor consegue criar e guardar rascunho, carregar media e submeter para revisão.
3. Publicador consegue publicar, agendar, retirar do ar e arquivar.
4. O site público mostra exclusivamente conteúdos publicados.
5. Pesquisa, filtros, paginação e arquivo continuam funcionais.
6. Documentos publicados podem ser abertos e descarregados; documentos privados não são acessíveis por URL público.
7. Mensagens de contacto são guardadas e acessíveis apenas a perfis autorizados.
8. Alterações ficam auditáveis.
9. Não há dados institucionais inventados nem conteúdo demonstrativo apresentado como oficial.
10. Testes cobrem permissões/RLS, estados editoriais, publicação agendada, upload e consultas públicas.

## 9. Sequência recomendada

1. Lovable cria o esquema, RLS, buckets e autenticação no projecto Supabase AJOCAMARC já criado.
2. Validar os perfis e as permissões com contas de teste.
3. Implementar o painel administrativo por módulo, começando por Notícias e Documentos.
4. Integrar os repositórios de `src/content/api.ts` sem alterar os contratos públicos.
5. Ligar o formulário de contacto ao armazenamento seguro.
6. Criar a página pública de transparência apenas quando houver documentos reais para publicar; até lá, mostrar estado vazio institucional claro.
7. Executar testes, revisão de segurança e validação visual antes da publicação.
