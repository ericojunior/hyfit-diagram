# Evidências da análise documental

Referência: checkout local de `matchfit-api`, commit `73811db9ba1092de8643ce87de9cfa1c4ecdc2cb`, sem alterações locais no início da análise. Os caminhos abaixo são relativos à aplicação de referência, não a este repositório de documentação. O leitor deste repositório não precisa de acesso ao backend para ler os diagramas; para auditar a implementação, precisará de acesso autorizado ao código nesse commit.

| Arquivo ou área inspecionada | Evidência utilizada |
| --- | --- |
| `README.md` e `package.json` | Propósito da API, stack e dependências |
| `src/server.ts` | Inicialização da API, banco e jobs apenas em desenvolvimento; comentário sobre agendador externo em produção |
| `src/infra/http/routes/index.ts` | Módulos de treinos, alunos, professores, administração, pagamentos, integrações e cron |
| `src/infra/http/routes/workoutSessionsRoutes.ts` | Método POST, caminho de conclusão e aplicação de `authMiddleware` |
| `src/infra/http/controllers/StudentWorkoutController.ts` | Identidade autenticada, conversão de `checkInDate` e resposta `200` |
| `src/app/usecases/CompleteWorkoutSessionUseCase.ts` | Filtro por dono, estados permitidos, atualização de data/status e erros |
| `src/infra/db/sequelize/models/WorkoutSession.ts` | Estados `SCHEDULED=1`, `COMPLETED=2`, `CANCELLED=3`, `MISSED=4` e relacionamentos |
| `src/infra/http/middlewares/authMiddleware.ts` | JWT, UserSession ativa, expiração e User ativo |
| `src/infra/http/middlewares/errorHandler.ts` | Envelope de erros e resposta genérica `500` |
| `src/infra/http/routes/cronRoutes.ts` | Rotas de jobs protegidas por middleware de cron |
| `src/infra/factories/EmailServiceFactory.ts` | Seleção configurável de Mailtrap, SES ou SMTP |
| `src/infra/services/GoogleAuthService.ts` | Verificação de identidade via Firebase |
| `src/infra/services/ExpoPushNotificationService.ts` | Serviço de notificações push Expo |
| `src/infra/services/GCPStorageService.ts` e `payment/AsaasPaymentService.ts` | Adaptadores de arquivos e pagamentos identificados na estrutura |
| `src/app/usecases/SyncStravaWorkoutsUseCase.ts` | Renovação de token e consulta de atividades do Strava |
| `src/infra/http/routes/polarRoutes.ts` | Autorização e sincronização Polar |

## Grau de certeza

- **Observado:** stack, organização do backend e fluxo de conclusão descritos a partir dos arquivos acima.
- **Inferido:** um aplicativo cliente consome a API; sua tecnologia, telas e hospedagem não foram confirmadas.
- **Proposto:** apresentação de estados de erro e reconciliação após timeout na interface; HTTPS em produção.
- **Pendente:** contratos completos, requisitos operacionais, implantação real e decisões de produto listadas no README.

Esta é uma análise com recorte explícito, não auditoria de todo o código. Uma dependência instalada ou um adaptador existente não comprova uso efetivo em produção.
