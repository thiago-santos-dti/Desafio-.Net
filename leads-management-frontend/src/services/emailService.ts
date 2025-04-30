export const sendEmailNotification = async (
  email: string,
  message: string
): Promise<void> => {
  window.alert(`Email enviado para ${email}: ${message}`);
};
