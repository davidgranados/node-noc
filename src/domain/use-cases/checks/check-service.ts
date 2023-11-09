interface CheckServiceUseCae {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCae {
  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      console.log(`Check service ${url} is ok`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
