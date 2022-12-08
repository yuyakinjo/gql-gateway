import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: { cors: true },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3001/graphql/users' },
            { name: 'posts', url: 'http://localhost:3002/graphql/posts' },
            { name: 'comments', url: 'http://localhost:3003/graphql/comments' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
