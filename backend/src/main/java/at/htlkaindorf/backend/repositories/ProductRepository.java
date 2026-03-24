package at.htlkaindorf.backend.repositories;

import at.htlkaindorf.backend.pojos.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
