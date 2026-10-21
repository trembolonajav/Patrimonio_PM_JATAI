package com.assetguardian.backend.config;

import com.assetguardian.backend.auth.PortalUserAccount;
import com.assetguardian.backend.auth.PortalUserAccountRepository;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class StandaloneAccountSeeder implements ApplicationRunner {

    private final PortalUserAccountRepository repository;

    @Value("${app.bootstrap.admin-username:admin}")
    private String adminUsername;

    @Value("${app.bootstrap.admin-password:admin123}")
    private String adminPassword;

    @Value("${app.bootstrap.operator-username:operadora}")
    private String operatorUsername;

    @Value("${app.bootstrap.operator-password:operadora123}")
    private String operatorPassword;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        createIfMissing(adminUsername, adminPassword, "Administrador do Inventario", Set.of("admin"));
        createIfMissing(operatorUsername, operatorPassword, "Operador do Inventario", Set.of("operador"));
    }

    private void createIfMissing(String username, String password, String fullName, Set<String> roles) {
        String normalizedUsername = username == null ? "" : username.trim();
        if (normalizedUsername.isBlank() || password == null || password.isBlank()) {
            return;
        }
        if (repository.findByUsernameIgnoreCase(normalizedUsername).isPresent()) {
            return;
        }

        PortalUserAccount account = new PortalUserAccount();
        account.setId(UUID.randomUUID());
        account.setUsername(normalizedUsername);
        account.setFullName(fullName);
        account.setEmail(normalizedUsername.toLowerCase(Locale.ROOT) + "@inventario.local");
        account.setPassword(password);
        account.setRoles(new LinkedHashSet<>(roles));
        repository.save(account);
    }
}
