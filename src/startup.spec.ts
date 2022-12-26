import { HEALTH } from "./gql/health";
import { InitializeComponents, SetupGraphqlServer } from "./startup";

describe("Startup integration tests", () => {
  InitializeComponents();
  it("SetupGraphqlServer should setup successfully", async () => {
    //arrange
    const server = SetupGraphqlServer();

    //act
    const response = await server.executeOperation({
      query: HEALTH,
    });

    //assert
    expect(response.body.kind).toBe("single");
    expect(response.http.status).toBe(undefined);

    //!!cannot test data itself because response.body.singleResult is not defined in typescript apollo
    //todo: open an issue on apollo github
  });
});
