package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.BankAccount;
import org.audit.app.repository.BankAccountRepository;
import org.audit.app.service.BankAccountService;
import org.audit.app.service.dto.BankAccountDTO;
import org.audit.app.service.mapper.BankAccountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link BankAccount}.
 */
@Service
public class BankAccountServiceImpl implements BankAccountService {

    private final Logger log = LoggerFactory.getLogger(BankAccountServiceImpl.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountServiceImpl(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    @Override
    public BankAccountDTO save(BankAccountDTO bankAccountDTO) {
        log.debug("Request to save BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    @Override
    public BankAccountDTO update(BankAccountDTO bankAccountDTO) {
        log.debug("Request to update BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    @Override
    public Optional<BankAccountDTO> partialUpdate(BankAccountDTO bankAccountDTO) {
        log.debug("Request to partially update BankAccount : {}", bankAccountDTO);

        return bankAccountRepository
            .findById(bankAccountDTO.getId())
            .map(existingBankAccount -> {
                bankAccountMapper.partialUpdate(existingBankAccount, bankAccountDTO);

                return existingBankAccount;
            })
            .map(bankAccountRepository::save)
            .map(bankAccountMapper::toDto);
    }

    @Override
    public Page<BankAccountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll(pageable).map(bankAccountMapper::toDto);
    }

    @Override
    public Optional<BankAccountDTO> findOne(String id) {
        log.debug("Request to get BankAccount : {}", id);
        return bankAccountRepository.findById(id).map(bankAccountMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
    }
}
