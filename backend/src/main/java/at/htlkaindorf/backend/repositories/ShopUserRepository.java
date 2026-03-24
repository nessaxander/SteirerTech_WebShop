package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.ShopUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopUserRepository extends JpaRepository<ShopUser, Long> {
}
