import { ExceptionFilter, Catch, Logger, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('AllExceptionFilter')

  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception, host) {
    this.logger.error(exception)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    console.log(request.body);
    console.log(exception);
    let status = exception?.response?.status

    if (exception?.getStatus && typeof exception.getStatus === 'function') {
      status = exception.getStatus()
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.response.message || exception.message || 'Erro na solicitação de resposta.',
    })
  }
}
