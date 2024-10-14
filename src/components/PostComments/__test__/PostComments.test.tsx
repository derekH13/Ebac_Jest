import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";

import PostComments from ".."; // Importo o componente

describe("Teste para o componente PostComments", () => {
  test("Deve adicionar dois comentários corretamente", () => {
    render(<PostComments />);

    const commentTextarea = screen.getByRole("textbox");

    // Digitando o 'primeiro comentário'
    fireEvent.change(commentTextarea, {
      target: { value: "Primeiro comentário" },
    });

    expect(commentTextarea).toHaveValue("Primeiro comentário");

    const submitButton = screen.getByRole("button", { name: /comentar/i });    // Encontra o botão de enviar comentário

    fireEvent.click(submitButton);                                              // Clica no botão de enviar comentário

    expect(screen.getByText("Primeiro comentário")).toBeInTheDocument();        // Verifica se o comentário foi adicionado à lista

    // Digita agora o segundo comentário
    fireEvent.change(commentTextarea, {
      target: { value: "Segundo comentário" },
    });
    
    expect(commentTextarea).toHaveValue("Segundo comentário");                  // Verifica se o texto foi digitado corretamente

    fireEvent.click(submitButton);                                              // Clica novamente no botão de enviar comentário
   
    expect(screen.getByText("Segundo comentário")).toBeInTheDocument();          // Verifica se o segundo comentário foi adicionado à lista

    expect(screen.getAllByTestId("post-comment")).toHaveLength(2);               // Verifica se ambos os comentários estão presentes
  });
});
